import {useState} from 'react';
// React: Nhập thư viện React để sử dụng tính năng React trong component

function SaveTask(key, initialValue) {
// Khai báo custom hook tên SaveTask => Lưu trữ trạng thái vào localStorage và tự đồng bộ khi trạng thái thay đổi
// key: Là một chuỗi gái trị lưu trữ cho khóa duy nhất
// initialValue: Giá trị ban đầu được lưu trữ nếu chưa có giá trị nào tồn tại với key

    const storedValue = localStorage.getItem(key);
    // Kiểm tra giá trị khóa key trong localStorage => Nếu tìm thấy thì trả về giá trị dưới dạng chuỗi. Nếu không tìm thấy thì trả về null

    const [state, setState] = useState(storedValue ? JSON.parse(storedValue) : initialValue);
    // Nếu storedValue tồn tại, dùng giá trị đã lưu JSON.parse ( chuyển chuỗi JSON thành kiểu dữ liễu đối tượng)

    const setPersistedState = (newState) => {
    //Khai báo hàm setPersistedState để cập nhập trạng thái và đồng bộ hóa dữ liệu mới vào localStorage
        setState(newState);
        // Cập nhập trạng thái của state với giá trị mới (newState) 
        localStorage.setItem(key, JSON.stringify(newState));
        // Lưu newState vào localStorage dưới dạng chuỗi JSON
        // key: khóa được sử dụng để lưu trữ giá trị
        // Dữ liệu được chuyển thành chuỗi bằng JSON.stringify
    };

    return [state, setPersistedState];
    // Trả về một mảng gồm hai phần tử:
    // + state: trạng thái hiện tại được lấy từ localStorage hoặc mặc định
    // + setPersistedState: Hàm để cập nhập trạng thái và đồng bộ với localStorage
}

export default SaveTask;