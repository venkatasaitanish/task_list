import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import styles from './DisplayTasks.module.css';
//const local_url = 'http://localhost:5500/api/item';
const base_url = process.env.REACT_APP_BASE_URL;


const DisplayTasks = () => {

    const [taskList, setTaskList] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [search, setSearch] = useState('');

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
                //console.log(res.data);
                setTaskList(res.data);
                setFetch(true);
            } catch (err) {
                console.log(err);
            }
        }
        getallTasks();
    }, [taskList.values]);

    const Loading = () => {
        return(
            <div className='text-center'>
                <CircularProgress/>
            </div>
        )
    }

    const NoTasks = () => {
        return(
            <div className={styles.noTasks}>
                <Card >
                    <CardContent>
                        <Typography variant='h5' component='div' className='text-center'>
                            No Tasks To Do 🎆
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className={styles.content}>
            <div className='container'>
                <h1 className={`text-center ${styles.heading}`}>Task List</h1>
                <div className={styles.addBtn}>
                    <Link to="/addTask">
                        <button className="btn btn-primary">Add Task</button>
                    </Link>
                </div>
                <div>
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Search task"
                                name="search"
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div>
                    {fetch === false ? (Loading()) : taskList && taskList.length > 0 ? (
                        <Card>
                            <CardContent className={styles.tableCardContent}>
                                <Table responsive="sm" className="table-bordered">
                                    <thead>
                                        <tr className='text-center'>
                                            <th>Task</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taskList.filter(curr => curr.item.toLowerCase().includes(search)).map((curr) => (
                                            <tr key={curr._id}>
                                                <td className={styles.col}>{curr.item}</td>
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
                            </CardContent>
                        </Card>
                    ) : (NoTasks())}
                </div>
            </div>
        </div>
    )
}

export default DisplayTasks;