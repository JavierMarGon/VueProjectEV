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
            return { success: true, data };
        }else {
            return { success: false, error:"Error en la autenticación: " + response.status };
        }
        
    },
    async postRegister(dateIn, emailIn, lastnameIn, nameIn, passwordIn, phoneIn,usernameIn){
        let response= await fetch(this.BASE_URL+"/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                date: dateIn,
                email: emailIn,
                lastname: lastnameIn,
                name: nameIn,
                password: passwordIn,
                phone: phoneIn,
                username: usernameIn }) 
        });
        if (response.status===200){
            return { success: true, data };
        }else {
            return { success: false, error:"Error en la autenticación: " + response.status };
        }
    },
    async patchUserData(dateIn, emailIn, lastnameIn, nameIn, phoneIn){
        let token = sessionStorage.getItem("token");
        let response= await fetch(this.BASE_URL+"/currentUser", {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ 
                date: dateIn,
                email: emailIn,
                lastname: lastnameIn,
                name: nameIn,
                phone: phoneIn}) 
        });
        if (response.status===200){
            let data = await response.json();
            return { success: true, data };
        }else {
            return { success: false, error:"Error en la autenticación: " + response.status };
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
            return { success: true, data };
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
            return { success: false, data };
        }else {
            return { success: false, data };
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
            method: "POST",
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
            method: "POST",
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
        let response = await fetch(this.BASE_URL + "/date/getByUser", {
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
    },
    async getDatesByDay(date, center){
        let token = sessionStorage.getItem("token");
        let response = await fetch(this.BASE_URL + "/date/getByDay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ 
                day: date
            })
        });
        if (response.status===200){
            let data = await response.json();
            let filteredData = data.filter(item => item.center === center);
            return filteredData;
        }else if(response.status===401){
            console.error("Token expirado. Redirigiendo al login...");
            sessionStorage.clear();
            window.location.href = "/login";
        }else {
            throw new Error("Error en la autenticación: " + response.status);
        }
    }
}