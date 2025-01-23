function customFilter(tasks, remove){
// tasks: Mảng ban đầu
// remove: Hàm callback kiểm tra điều kiện để giữ lại phần tử
        const newItem = [];
        for ( let i = 0; i < tasks.length; i++){
        // Vòng lặp đi qua từng phần tử trong mảng
            if (remove(tasks[i])){
            // Gọi hàm remove với từng phần tử - Nếu hàm remove trả về true thì phần tử đó được giữ lại
                newItem.push(tasks[i])
                // Thêm phần tử vào cuối mảng
            }
        }
        return newItem;

        // Dùng vòng lặp while: 
        // const newItem = [];
        // let i = 0;
        // while (i < tasks.length) {
        //  if (remove(tasks[i])) {
        //      newItem.push(tasks[i]);
        //  }
        //  i++;
        // }
        // return newItem;
}

function customMap(tasks, repeatTask){
    // Thay thế cho phương thức Array.map()
        const newItem = [];
        for ( let i = 0; i < tasks.length; i++){
            newItem.push(repeatTask(tasks[i]));
        }
        return newItem;

        // const newItem = [];
        // let i = 0;
        // while (i < tasks.length) {
        //      newItem.push(repeatTask(tasks[i]));
        //      i++; 
        // }
        // return newItem;
}


export {customFilter, customMap};