"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8081;
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    await app.listen(PORT, () => {
        console.log(`server start on port:${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map