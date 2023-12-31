import dotenv from 'dotenv';
import cors from 'cors';
import express, { Express, Router } from 'express';
import controllers from './api/controllers';
import { IApiRouterDefinition } from './api/http/handlers/IRouterDifinition';
import RouterControl from '@router-control';
import { MakeDependencies } from '@di';
import { IResponse } from '@http';

dotenv.config();

const whiteList = [
	'http://localhost:3000',
  ];

const options: cors.CorsOptions = {
	origin: whiteList
}

@MakeDependencies()
class App {
	public app: Express;

	constructor() {
		this.app = express();
		this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
		this.app.use(express.json({ limit: '100mb' }));
		this.app.use(cors(options));
		this.makeRouter();
	}

	makeRouter() {
		controllers.forEach((Controller) => {
			const router = Router();
			const instance = new Controller();
			const routes: IApiRouterDefinition[] = RouterControl.getRouters(instance.constructor.name) as IApiRouterDefinition[];

			const prefix: string = RouterControl.getPrefix(instance.constructor.name) as string;
			for (const route of routes) {
				router[route.method](`${route.path}`, async (req, res) => {
					const response = await instance[String(route.controllerMethod) as keyof typeof instance](req) as IResponse;
					return res.status(response.statusCode).json({ body: response.body });
				}).bind(instance);
			}
			this.app.use(prefix, router);
		});
	}
}

const { app } = new App();

export default app;