
function CustomFilter(tasks, remove){
    // Hàm thay thế cho phương thức Array.filter()
    // tasks: Mảng các công việc
    // remove: Hàm callback để kiểm tra điều kiện
        const newItem = [];
        for ( let i = 0; i < tasks.length; i++){
        // Vòng lặp đi qua từng phần tử trong mảng
            if (remove(tasks[i])){
            // Gọi hàm remove với đối số là tasks[i]. Kết quả trả về true - ĐK của hàm remove
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

export default CustomFilter;