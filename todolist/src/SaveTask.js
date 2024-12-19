import {useState} from 'react';
// React: Nhập thư viện React để sử dụng tính năng React trong component

function SaveTask(key, initialValue) {
// Khai báo custom hook tên SaveTask => Lưu trữ trạng thái vào localStorage và tự đồng bộ khi trạng thái thay đổi
// key: khóa dùng để lưu dữ liệu vào localStorage
// initialValue: giá trị khởi tạo mặc định, dùng nếu không có dữ liệu trong localStorage

    const storedValue = localStorage.getItem(key);
    // Truy vấn localStorage bằng key để kiểm tra xem có dữ liệu nào đã được lưu trước đó không
    // Nếu có, storedVakue sẽ chứa dữ liệu(ở dạng chuỗi) lấy từ localStorage. Nếu không thì null

    const [state, setState] = useState(storedValue ? JSON.parse(storedValue) : initialValue);
    // Nếu storedValue không phải là null(có dữ liệu trong localStorage), chuyển đổi chuỗi JSON thành đối tượng JS bằng JSON.parse
    // Nếu storedValue là null, sử dụng intialValue làm giá trị khởi tạo

    const setPersistedState = (newState) => {
    //Khai báo hàm setPersistedState để cập nhập trạng thái và đồng bộ hóa dữ liệu mới vào localStorage
        setState(newState);
        // Cập nhập trạng thái của state với giá trị mới (newState) 
        localStorage.setItem(key, JSON.stringify(newState));
        // Lưu newState vào localStorage dưới dạng chuỗi JSON
        // localStorage.setItem cần một cặp key(tên của mục cần lưu) và value(nội dung cần lưu)
        // Dữ liệu được chuyển thành chuỗi bằng JSON.stringify
    };

    return [state, setPersistedState];
    // Trả về một mảng gồm hai phần tử:
    // + state: trạng thái hiện tại
    // + setPersistedState: Hàm để cập nhập trạng thái và đồng bộ với localStorage
}

export default SaveTask;