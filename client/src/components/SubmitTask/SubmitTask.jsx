import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {CircularProgress} from '@mui/material';
import styles from './SubmitTask.module.css';
//const local_url = 'http://localhost:5500/api/item';
const base_url = process.env.REACT_APP_BASE_URL;

const SubmitTask = () => {

    const[item, setItem] = useState('');
    const[fetch, setFetch] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const addTask = async (e) => {
        e.preventDefault();
        const newTask = {item};
        if(id) {
            try {
                const res = await axios.put(`${base_url}/${id}`, newTask);
                console.log(res.data);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                const res = await axios.post(`${base_url}`, newTask);
                console.log(res.data);
                navigate('/')
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await axios.get(`${base_url}/${id}`);
                setItem(res.data.item);
                setFetch(true);
            } catch (err) {
                console.log(err);
            }
        }
        if(id) {
            getTask();
        }
        else {
            setFetch(true);
        }
    }, [id]);

    const renderTitle = () => {
        if (id) return <h2 className="text-center my-2">Update Task</h2>
        return <h2 className="text-center my-2">Add Task</h2>
    }

    const Loading = () => {
        return (
            <div className='text-center'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className={styles.content}>
            <div className='container'>
                <div className="card col-md-6 offset-md-3">
                    {renderTitle()}
                    <div className="card-body">
                        {fetch === false ? (Loading()) : (
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Task :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task"
                                        name="task"
                                        className="form-control"
                                        value={item}
                                        onChange={(e) => setItem(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button
                                        className="btn btn-success" onClick={(e) => addTask(e)}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitTask;