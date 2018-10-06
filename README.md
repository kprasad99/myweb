# Myweb

An example Angular PWA to demo Angular v6 with spring security

## Running the application

- Clone backend application [myweb-backend]
    ```
        git clone https://github.com/kprasad99/myweb-backend.git
    ```
- Start backend application
    ```
        mvn spring-boot:run
    ```
- Clone myweb
    ```
        git clone https://github.com/kprasad99/myweb.git
    ```
- Start angular application
    ```
        ng serve
    ```
- myweb app can be accessed on url `http://localhost:4200` using browser

## Notes

- Uses Angular v6, Angular Material, Material Icon, Angular Fontawesome, Angular PWA, Angular FlexLayout.
- myweb-backend binds to port 8181 and myweb starts on port 4200(default ng serve) and a proxy-config.json is added to proxy `/auth` and `/api` call to backend server.
- Default username/password is user/password
