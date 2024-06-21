import { createAPP } from './app.js';
import { UserModel } from './models/database/userM.js';
import { StoreModel } from './models/database/storeM.js';
import { BrandModel } from './models/database/brandM.js';

createAPP({ storeModel: StoreModel, userModel: UserModel, brandModel: BrandModel });
