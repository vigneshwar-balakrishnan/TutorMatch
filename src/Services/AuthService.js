
export default {
    login: user => {
        console.log(user);
        return fetch('/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "" } };
        })
    },
    register: user => {
        console.log(user);
        return fetch('/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch('/user/logout')
            .then(res => res.json())
            .then(data => data);
    },
    forgotPass: user => {
        console.log(user);
        return fetch('api/v1/users/forgotpassword', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/authenticated')
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { username: "", role: "" } };
            });
    },
    getUserData: (username) => {
        return fetch('/getUserData', {
            method: "GET",
            body: JSON.stringify(username),
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        }).then(res => {
               return res.json().then(data => data);
            });
    }

}