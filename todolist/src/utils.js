function customFilter(array, fn){
        const newItem = [];
        for ( let i = 0; i < array.length; i++){
            if (fn(array[i])) {
            // Gọi hàm callback với từng phần tử và kiểm tra điều kiện trả về true thì thêm phần tử vào mảng mới
                newItem.push(array[i])
                // Thêm phần tử vào cuối mảng
            }
        }
        return newItem;
}

function customMap(array, fn){
    // Thay thế cho phương thức Array.map()
        const newItem = [];
        for ( let i = 0; i < array.length; i++){
            newItem.push(fn(array[i]));
        }
        return newItem;
}

export {customFilter, customMap};