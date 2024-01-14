import { test as setup } from '@playwright/test';
import configJson from '../configfiles/config.json'
import { ApiCalls } from '../logic/api/api-calls';

setup('authenticate', async ({request}) => {
    const apiCall= new ApiCalls();
    await apiCall.performLogin(request,configJson.loginUrl,configJson.email,configJson.password)
    await request.storageState({ path: configJson.authFile });
});

