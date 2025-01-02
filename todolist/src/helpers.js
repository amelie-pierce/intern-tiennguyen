
function CustomMap(tasks, repeatTask){
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

export default CustomMap;