import { useState, useEffect } from 'react';
import { db } from './libs/firebase';
import {
    collection, // Lấy tham chiếu đến collection trong FS
    addDoc,     // Thêm 1 document mới vòa collection
    deleteDoc,  // Xóa 1 document cụ thể
    doc,        // Lấy tham chiếu đến 1 collection cụ thể
    updateDoc,  // Cập nhập các field trong 1 document cụ thể
    onSnapshot, // Thiết lập trình lắng nghe theo time thực cho collection or document
    serverTimestamp,  // Tạo 1 dấu time từ máy chủ
    query,      // Tạo truy vấn trong FS
    orderBy     // Sắp xếp kết quả truy vấn theo 1 field cụ thể
} from 'firebase/firestore';

export function useTaskStorage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'asc'));
        // Tạo query(truy vấn) FS lấy dữ liệu từ collection
        // createdAt: lưu trữ time từ máy chủ cho mỗi task được tạo
        // asc(ascending): sd orderby thì yêu cầu sắp xếp document trong collection dựa trên createdAt (cũ đến mới)
        const unsubscribe = onSnapshot(q, (snapshot) => {
        // onSnapshot: lắng nghe các thay đổi theo time. Có thể nhận update khi DL thay đổi mà k cần gọi lại q
        // snapshot: Đc gọi khi có thay đổi mới nhất trong DL FS. 
            // const tasksData = snapshot.docs.map(doc => ({
            // snapshot.docs: array chứa all document
                // id: doc.id,
                // ...doc.data(),
                // Sao chép all field DL của document dạng object
                // createdAt: doc.data().createdAt?.toDate() || new Date()
                // Lấy giá trị của createdAt để lưu trữ time và ngày giờ
                // toDate(): chuyển đổi giá trị timestamp thành 1 object data
                
             const tasksData = [];
                const docs = snapshot.docs;
                // Kết quả của mảng chứa CSDL các documents từ FS được truy vấn
                for (let i = 0; i < docs.length; i++) {
                // Vòng lặp duyệt qua từng document trong mảng
                    const docData = docs[i].data();
                    // Lấy dữ liệu tại vị trí i và trả về như title, complete
                    tasksData.push({
                        id: docs[i].id,
                        ...docData,
                        createdAt: docData.createdAt?.toDate() || new Date()
                    });
                }

            // }));
            setTasks(tasksData);
            setLoading(false);

        }, (err) => {
            setError('Failed to fetch tasks');
            setLoading(false);
        });

        return () => unsubscribe();
        // Hàm cleanup(ngừng lắng nghe các thay đổi từ FS). 
    }, []);

    const addTask = async (title) => {
    // async(bất đồng bộ): trả về đối tượng Promise
        try {
            const docRef = await addDoc(collection(db, 'tasks'), {
                // await: đợi một đối tượng Promise hoàn tất trước khi thực thi các câu lệnh tiếp theo
                title,
                completed: false,
                createdAt: serverTimestamp()
            });
            return { id: docRef.id, title, completed: false };
        } catch (err) {
            setError('Failed to add task');
        }
    };

    const updateTask = async (id, updates) => {
        try {
            const taskRef = doc(db, 'tasks', id);
            await updateDoc(taskRef, updates);
            // updateDoc: Hàm từ FS update DL 1 document dựa trên tham chiếu taskRef
            // updates: object chứa các field và giá trị cần update
            return { id, ...updates };
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
            // deleteDoc: hàm từ FS SDK dùng để xóa TL trong FS
        } catch (err) {
            setError('Failed to delete task');
            throw err;
        }
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        // find(): tìm kiếm object trong array task có thuộc tính id trùng với id truyền vào
        if (task) {
            await updateTask(id, { completed: !task.completed });
        }
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleTask

        // Trả về object chứa các giá trị và hàm
        // Các biết lưu trữ state: tasks, loading, error
        // Các hàm để thao tác: add, delete, update, toggle
    };
}