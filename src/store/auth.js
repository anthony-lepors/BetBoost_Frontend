import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        authErrors: [],
        authStatus: null,
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        status: (state) => state.authStatus,
    },
    actions: {
        async getToken() {
            await axios.get("/sanctum/csrf-cookie");
        },
        async getUser() {
            this.authErrors = [];
            // this.authStatus = null;
            await this.getToken();
            try{
                const data = await axios.get("/api/user");
                this.authUser = data.data;
            } catch (error){
                if (error.response.status === 401) {
                    this.authErrors = error.response.data;
                    this.authUser = null;
                }
            }
        },
        async handleLogin(data) {
            this.authErrors = [];
            await this.getToken();
            try{
                await axios.post("/login", {
                    email: data.email,
                    password: data.password,
                });
                await this.getUser();
                router.push("/");
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleRegister(data) {
            this.authErrors = [];
            await this.getToken();

            console.log(data);

            try{
                await axios.post("/register", {
                    name: data.username,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password,
                });
                await this.getUser();
                router.push("/");
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleLogout() {
            await this.getToken();
            await axios.post("/logout", {
                // 
            });
            this.authUser = null;
            // router.push("/");
            const currentRoute = router.currentRoute.value;
            if (currentRoute.name === 'Account') {
                router.push("/");
            }
        },
        async handleForgotPassword(email) {
            this.authErrors = [];
            this.authStatus = null;
            await this.getToken();
            try{
                const data = await axios.post("/forgot-password", {
                    email: email,
                });
                this.authStatus = data.data.status;
                // router.push("/");
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleResetPassword(resetData) {
            this.authErrors = [];
            this.authStatus = null;
            await this.getToken();
            try{
                const data = await axios.post("/reset-password", resetData);
                this.authStatus = data.data.status;
                router.push("/login");
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleProfileUpdate(data) {
            this.authErrors = [];
            await this.getToken();
            try{
                await axios.put("/profile", {
                    name: data.name,
                    email: data.email,
                });
                await this.getUser();
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handlePasswordUpdate(data) {
            this.authErrors = [];
            this.authStatus = null;
            await this.getToken();
            try{
                const response = await axios.put("/password", {
                    current_password: data.current_password,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                });
                this.authStatus = response.data.message;
                await this.getUser();
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
        async handleProfileDelete(data) {
            this.authErrors = [];
            await this.getToken();
            try{
                await axios.put("/delete", {
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                });
                this.authUser = null;
                router.push("/");
            } catch (error){
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        },
    },
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    },
});
