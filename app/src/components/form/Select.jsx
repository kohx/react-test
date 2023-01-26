import React, { useState } from 'react'

export default () => {
    const [selectedValue, setSelectedValue] = useState('Joe')

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedValue(event.target.value);
    }

    const users = ['John', 'Joe', 'Kevin', 'Jane', 'Franc'];
    const [selectedUser, setSelectedUser] = useState('Joe');

    const handleChangeUser = (event) => {
        console.log(event.target.value);
        setSelectedUser(event.target.value);
    };

    return (
        <>
            <div>
                <select value={selectedValue} onChange={handleChange}>
                    <option value="John">John</option>
                    <option value="Joe">Joe</option>
                    <option value="Kevin">Kevin</option>
                </select>
            </div>

            <div>
                <select value={selectedUser} onChange={handleChangeUser}>
                    {users.map((user) => (
                        <option key={user} value={user}>
                            {user}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}