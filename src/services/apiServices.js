export default{
    BASE_URL: "http://127.0.0.1:5000",

    async postLogin(user, pass){
        let response= await fetch(this.BASE_URL+"/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                username: user, 
                password: pass }) 
        });
        if (response.status===200){
            let data = await response.json(); 
            sessionStorage.setItem("token",data.access_token);
            return data;
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
        
    },
    async postRegister(date, email, lastname, name, password, phone,username){
        let response= await fetch(this.BASE_URL+"/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                date: date,
                email: email,
                lastname: lastname,
                name: name,
                password: password,
                phone: phone,
                username: username }) 
        });
        if (response.status===200){
            console.log('Usuario creado');
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    },
    async getProfile() {
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if (response.status===200){
            let data = await response.json();
            sessionStorage.setItem("user", JSON.stringify(data));
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    },
    async getCenters(){
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/centers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if (response.status===200){
            let data = await response.json();
            sessionStorage.setItem("centers", JSON.stringify(data));
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    },
    async postDateCreate(centerName, date){
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/date/create", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ 
                center: centerName,
                date: date
            })
        });
        if (response.status===200){
            console.log(response.status);
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    },
    async postDateDelete(centerName, date){
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/date/delete", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ 
                center: centerName,
                date: date
            })
        });
        if (response.status===200){
            console.log(response.status);
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    },
    async getDates(){
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/dates", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if (response.status===200){
            let data = await response.json();
            sessionStorage.setItem("dates", JSON.stringify(data));
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    }
}