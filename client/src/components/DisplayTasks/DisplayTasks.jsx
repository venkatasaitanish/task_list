import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import styles from './DisplayTasks.module.css';
const local_url = 'http://localhost:5500/api/item';
const base_url = 'https://task-list-tanish.herokuapp.com/api/item';

const DisplayTasks = () => {

    const [taskList, setTaskList] = useState([]);

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`${base_url}/${id}`);
            const newTaskList = taskList.filter(curr => curr._id !== id);
            setTaskList(newTaskList);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getallTasks = async () => {
            try {
                const res = await axios.get(`${base_url}`);
                console.log(res.data);
                setTaskList(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getallTasks();
    }, [taskList.values]);

    return (
        <div className={styles.content}>
            <div className='container'>
                <h2 className='text-center'>Task List</h2>
                <div className={styles.addBtn}>
                    <Link to="/addTask">
                        <button className="btn btn-primary">Add Task</button>
                    </Link>
                </div>
                <div className={styles.table}>
                    <Table responsive="sm" className="table-bordered">
                        <thead>
                            <tr className='text-center'>
                                <th>Task</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.map((curr) => (
                                <tr key={curr._id}>
                                    <td>{curr.item}</td>
                                    <td className='text-center'>
                                        <Link to={`/updateTask/${curr._id}`}>
                                            <button className="btn btn-info">Update</button>
                                        </Link>
                                    </td>
                                    <td className='text-center'>
                                        <button className="btn btn-danger" onClick={() => { deleteTask(curr._id) }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default DisplayTasks;