package main

import (
	"fmt"
	"os"
	"strconv"
	"sync"

	"github.com/uber/h3-go/v4"
)

/*
該当範囲全てのセルの追加
```csv:cell.csv
Cell:ID,:LABEL
595291014210519039,H3_Cell_${res}
```
追加したセルの関係性の追加
exapmle
```csv:cell_rel.csv
:START_ID,:END_ID,:TYPE
595291014210519039,599794606321696767,Child_Cell
```
*/

type erea struct {
	LatLng h3.LatLng
}

func existFile(file string) bool {
	_, err := os.Stat(file)
	return err == nil
}

func writeCellFile(f *os.File, cell h3.Cell,res int, mu *sync.Mutex) {
	mu.Lock()
	defer mu.Unlock()
	f.Write(([]byte)(cell.String() + ",H3_Cell_" + strconv.Itoa(res) + "\n"))
}

func writeCellRelFile(f *os.File, cell h3.Cell, child_cell h3.Cell, mu *sync.Mutex) {
	mu.Lock()
	defer mu.Unlock()
	f.Write(([]byte)(cell.String() + "," + child_cell.String() + ",Child_Cell\n"))
}

func processChildCells(cell h3.Cell, res int, maxRes int, cell_f, cell_rel_f *os.File, mu *sync.Mutex) {
	if res > maxRes {
		return
	}

	child_cells := cell.Children(res)
	for _, child_cell := range child_cells {
		fmt.Println(child_cell)
		writeCellFile(cell_f, child_cell, res, mu)
		if cell != child_cell {
			writeCellRelFile(cell_rel_f, cell, child_cell, mu)
		}
		// writeResCellRelFile(res_cell_rel_f, res, child_cell, mu)
		processChildCells(child_cell, res+1, maxRes, cell_f, cell_rel_f, mu)
	}
}

func processErea(erea erea, cell_f, cell_rel_f *os.File, mu *sync.Mutex, wg *sync.WaitGroup) {
	defer wg.Done()

	startNum := 4

	var tmpCellParent h3.Cell
	cell := h3.LatLngToCell(erea.LatLng, startNum)
	for i := 0; i <= startNum ; i ++ {
		tmpCellChild := cell.Parent(i)
		if i != startNum {
			writeCellFile(cell_f, tmpCellChild, i, mu)
		}
		if i != 0 {
			writeCellRelFile(cell_rel_f, tmpCellParent, tmpCellChild, mu)
		}
		tmpCellParent = tmpCellChild
	}

	processChildCells(cell, startNum, 12, cell_f, cell_rel_f, mu)
}

func main() {
	cell_file := "../import/cell.csv"
	cell_rel_file := "../import/cell_rel.csv"

	cell_head := "cell:ID,:LABEL"
	cell_rel_head := ":START_ID,:END_ID,:TYPE"

	ereas := []erea{
		{LatLng: h3.LatLng{Lat: 35.174176 , Lng: 136.9166945}},
	}

	// ../import ディレクトリが存在しない場合は作成
	if _, err := os.Stat("../import"); os.IsNotExist(err) {
		os.Mkdir("../import", 0777)
	}

	if existFile(cell_file) || existFile(cell_rel_file) {
		os.Remove(cell_file)
		os.Remove(cell_rel_file)
	}

	cell_f, err := os.Create(cell_file)
	if err != nil {
		panic(err)
	}
	defer cell_f.Close()
	cell_f.Write(([]byte)(cell_head + "\n"))

	cell_rel_f, err := os.Create(cell_rel_file)
	if err != nil {
		panic(err)
	}
	defer cell_rel_f.Close()
	cell_rel_f.Write(([]byte)(cell_rel_head + "\n"))
	var wg sync.WaitGroup
	var mu sync.Mutex

	for _, erea := range ereas {
		wg.Add(1)
		go processErea(erea, cell_f, cell_rel_f, &mu, &wg)
	}

	wg.Wait()
}
