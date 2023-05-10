// 4. Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах.
// Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:
//
// - operating system;
// - architecture;
// - current user name;
// - cpu cores models;
// - cpu temperature;
// - graphic controllers vendors and models;
// - total memory, used memory, free memory в GB;
// - дані про батарею (charging, percent, remaining time).
//
// Знайдіть і використайте функціональність підходящих модулів.
import os from "os";
import si from "systeminformation";
import readline from "readline";
import process from "process";

const rl = readline.createInterface(
    process.stdin,
    process.stdout,
);

type GpuControllerInfo = {
    vendor: string,
    model: string
}
type MemoryInfo = {
    totalmemInfo: string,
    usedmemInfo: string,
    freememInfo: string,
}

type BatteryInfo = {
    batteryPercent: number,
    batteryRemainingTime: number,
    isBatteryCharging: boolean,
}

type ComputerInfo = {
    operatingSystem: string,
    architecture: string,
    username: string,
    cpuCoresModels: os.CpuInfo[],
    cpuTemperature:  si.Systeminformation.CpuTemperatureData,
    gpuInfo: GpuControllerInfo[],
    memory: MemoryInfo,
    battery: BatteryInfo,
}


const gpuVendorsAndModelsInfo = async (): Promise<GpuControllerInfo[]> => {
    const cachedValue = cache.get(gpuVendorsAndModelsInfo);
    if (cachedValue) return cachedValue;
    const {controllers} = await si.graphics();
    const res: GpuControllerInfo[] = [];
    for (const controller of controllers) {
        const gpuController: GpuControllerInfo = {
            vendor: controller.vendor,
            model: controller.model,
        };
        res.push(gpuController);
    }
    cache.set(gpuVendorsAndModelsInfo, res);
    return res;
};

const memoryInfo = (): MemoryInfo => {
    const totalMemory: number = os.totalmem() / 10e8;
    const freeMemory: number = os.freemem() / 10e8;
    const usedMemory: number = totalMemory - freeMemory;
    const totalmemInfo: string = Math.round(totalMemory * 100) / 100 + " GB";
    const usedmemInfo: string = Math.round(usedMemory * 100) / 100 + " GB";
    const freememInfo: string = Math.round(freeMemory * 100) / 100 + " GB";
    return {totalmemInfo, usedmemInfo, freememInfo};
};

const batteryInfo = async (): Promise<BatteryInfo> => {
    const battery = await si.battery();
    const batteryPercent = battery.percent;
    const batteryRemainingTime = battery.timeRemaining;
    const isBatteryCharging = battery.isCharging;
    return {batteryPercent, batteryRemainingTime, isBatteryCharging};
};

const operatingSystemInfo = async (): Promise<string> => {
    const cachedValue = cache.get(operatingSystemInfo);
    if (cachedValue) return cachedValue;
    return await si.osInfo().then(os => {
        const platform = os.platform;
        cache.set(operatingSystemInfo, platform);
        return platform;
    });
};

const cache = new Map();

const memoize = <T, R>(fn: (args?: T) => R): R => {
    let value: R = cache.get(fn);
    if (value) return value;
    value = fn();
    cache.set(fn, value);
    return value;
};


const computerInfo = async (): Promise<ComputerInfo> => {
    const architecture: string = memoize(os.arch);
    const {username} = memoize(os.userInfo);
    const cpuCoresModels = memoize(os.cpus);
    const memory: MemoryInfo = memoize(memoryInfo);
    const operatingSystem: string = await operatingSystemInfo();
    const gpuInfo: GpuControllerInfo[] = await gpuVendorsAndModelsInfo();

    // виконуютья дуже довго, закешувати неможливо
    // адже треба актуальна фніормація
    const cpuTemperature = await si.cpuTemperature();

    // виконуютья дуже довго, закешувати неможливо,
    // адже треба актуальна фніормація
    const battery: BatteryInfo = await batteryInfo();

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

// setInterval + promise створює неочікувану поведінку, тому прийлося створювати свій інтервал
const interval = (time: number, cb: () => Promise<ComputerInfo>): void => {
    const infoFuture: Promise<ComputerInfo> = cb();
    const wrappedCb = async () => {
        const info = await infoFuture;
        console.log(info);
        interval(time, cb);
    };
    setTimeout(wrappedCb, time);
};
// Вцілому це завдання неможливо виконати коректно
// Усі асинхронні запити, щодо gpu, cpuTemperature та батареї виконуються по декілька секунд,
// тому накращим випадком булоб закешувати їх. Але у випадку з батареєю або температурою
// це явно буде невірно, тому я залишив все як є і добавив кешування туди, куди це можливо
rl.question("Please input frequency(minimum 1) μ = ", (answer: string): void => {
    const time: number = parseFloat(answer) * 1000;
    if (!Number.isNaN(time) && time >= 1) {
        interval(time, computerInfo);
    } else {
        console.log("Frequency value is incorrect, please try again");
        process.exit(1);
    }
});



