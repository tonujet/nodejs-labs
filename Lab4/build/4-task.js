"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const systeminformation_1 = __importDefault(require("systeminformation"));
const readline_1 = __importDefault(require("readline"));
const process_1 = __importDefault(require("process"));
const rl = readline_1.default.createInterface(process_1.default.stdin, process_1.default.stdout);
const gpuVendorsAndModelsInfo = async () => {
    const cachedValue = cache.get(gpuVendorsAndModelsInfo);
    if (cachedValue)
        return cachedValue;
    const { controllers } = await systeminformation_1.default.graphics();
    const res = [];
    for (const controller of controllers) {
        const gpuController = {
            vendor: controller.vendor,
            model: controller.model,
        };
        res.push(gpuController);
    }
    cache.set(gpuVendorsAndModelsInfo, res);
    return res;
};
const memoryInfo = () => {
    const totalMemory = os_1.default.totalmem() / 10e8;
    const freeMemory = os_1.default.freemem() / 10e8;
    const usedMemory = totalMemory - freeMemory;
    const totalmemInfo = Math.round(totalMemory * 100) / 100 + " GB";
    const usedmemInfo = Math.round(usedMemory * 100) / 100 + " GB";
    const freememInfo = Math.round(freeMemory * 100) / 100 + " GB";
    return { totalmemInfo, usedmemInfo, freememInfo };
};
const batteryInfo = async () => {
    const battery = await systeminformation_1.default.battery();
    const batteryPercent = battery.percent;
    const batteryRemainingTime = battery.timeRemaining;
    const isBatteryCharging = battery.isCharging;
    return { batteryPercent, batteryRemainingTime, isBatteryCharging };
};
const operatingSystemInfo = async () => {
    const cachedValue = cache.get(operatingSystemInfo);
    if (cachedValue)
        return cachedValue;
    return await systeminformation_1.default.osInfo().then(os => {
        const platform = os.platform;
        cache.set(operatingSystemInfo, platform);
        return platform;
    });
};
const cache = new Map();
const memoize = (fn) => {
    let value = cache.get(fn);
    if (value)
        return value;
    value = fn();
    cache.set(fn, value);
    return value;
};
const computerInfo = async () => {
    const architecture = memoize(os_1.default.arch);
    const { username } = memoize(os_1.default.userInfo);
    const cpuCoresModels = memoize(os_1.default.cpus);
    const memory = memoize(memoryInfo);
    const operatingSystem = await operatingSystemInfo();
    const gpuInfo = await gpuVendorsAndModelsInfo();
    const cpuTemperature = await systeminformation_1.default.cpuTemperature();
    const battery = await batteryInfo();
    return {
        operatingSystem,
        architecture,
        username,
        cpuCoresModels,
        cpuTemperature,
        gpuInfo,
        memory,
        battery,
    };
};
const interval = (time, cb) => {
    const infoFuture = cb();
    const wrappedCb = async () => {
        const info = await infoFuture;
        console.log(info);
        interval(time, cb);
    };
    setTimeout(wrappedCb, time);
};
rl.question("Please input frequency(minimum 1) μ = ", (answer) => {
    const time = parseFloat(answer) * 1000;
    if (!Number.isNaN(time) && time >= 1) {
        interval(time, computerInfo);
    }
    else {
        console.log("Frequency value is incorrect, please try again");
        process_1.default.exit(1);
    }
});
