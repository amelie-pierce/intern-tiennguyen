import { useState, useEffect } from 'react';
import { db } from './libs/firebase';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy
} from 'firebase/firestore';

export function useTaskStorage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date()
            }));
            setTasks(tasksData);
            setLoading(false);

            //  const tasksData = [];
            //     const docs = snapshot.docs;
            //     // Kết quả của mảng chứa CSDL các documents từ FS được truy vấn
            //     for (let i = 0; i < docs.length; i++) {
            //     // Vòng lặp duyệt qua từng document trong mảng
            //         const docData = docs[i].data();
            //         // Lấy dữ liệu tại vị trí i và trả về như title, complete
            //         tasksData.push({
            //             id: docs[i].id,
            //             ...docData,
            //             createdAt: docData.createdAt?.toDate() || new Date()
            //         });
            //     }

        }, (err) => {
            setError('Failed to fetch tasks');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addTask = async (title) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), {
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
            return { id, ...updates };
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (err) {
            setError('Failed to delete task');
            throw err;
        }
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
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
    };
}