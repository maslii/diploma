module.exports = (db, wishes) => {
    const rated = db

    rated.forEach((curr, i, arr) => {
        const item = curr
        item.confidence = 0
        item.why = []

        if (wishes.hasOwnProperty('fast')) {
            if (wishes.smartphone === true && item.smartphone === true) {
                item.confidence += 10
                item.why.push('Смартфон')
            }

            if (wishes.new === true) {
                if (item.year > new Date().getFullYear() - 2) {
                    item.confidence += 5
                    item.why.push('Новинка')
                }
            }

            if (wishes.apple === true) {
                if (item.os === 'ios') {
                    item.confidence += 20
                    item.why.push('iOS')
                }
            }

            if (wishes.android === true) {
                if (item.os === 'android') {
                    item.confidence += 20
                    item.why.push('Android')
                }
            }

            if (wishes.windows === true) {
                if (item.os === 'windows') {
                    item.confidence += 20
                    item.why.push('Windows')
                }
            }

            if (wishes.cheap === true) {
                if (item.price < 3000) {
                    item.confidence += 10
                    item.why.push('Дешевий')
                }
            }

            if (wishes.cheaptop === true) {
                if (item.price < 5000) {
                    if (item.cpufrequency > 1.2 && item.ram > 1) {
                        item.confidence += 15
                        item.why.push('Дешевий та потужний')
                    }
                }
            }

            if (wishes.top === true) {
                if (item.cpufrequency > 1.5 && item.ram > 2) {
                    item.confidence += 8
                    item.why.push('Потужний')
                }
            }

            if (wishes.camerafront === true) {
                if (item.camerafrontmp > 0) {
                    item.confidence += 7
                    item.why.push('Є селфі камера')
                }
            }

            if (wishes.camerarear === true) {
                if (
                    item.camerarearmp > 5 &&
                    item.camerarearflash === true &&
                    item.camerarearfocus === true &&
                    item.camerarearstab === true
                ) {
                    item.confidence += 5
                    item.why.push('Хороша камера')
                }
            }

            if (wishes.dualsim === true) {
                if (item.dualsim === true) {
                    item.confidence += 5
                    item.why.push('Дві сім-карти')
                }
            }

            if (wishes.sdcard === true) {
                if (item.sdcard === true) {
                    item.confidence += 5
                    item.why.push('Карта памяті')
                }
            }

            if (wishes.tv === true) {
                if (item.irda === true) {
                    item.confidence += 3
                    item.why.push('IrDA порт')
                }
            }

            if (wishes.nfc === true) {
                if (item.nfc === true) {
                    item.confidence += 5
                    item.why.push('NFC')
                }
            }

            if (wishes.wifi === true) {
                if (item.wifi === true) {
                    item.confidence += 5
                    item.why.push('WiFi')
                }
            }

            if (wishes.geo === true) {
                if (item.geo === true) {
                    item.confidence += 5
                    item.why.push('Геолокація')
                }
            }

            if (wishes.hsdpa === true) {
                if (item.hsdpa === true) {
                    item.confidence += 5
                    item.why.push('3G')
                }
            }

            if (wishes.lte === true) {
                if (item.lte === true) {
                    item.confidence += 5
                    item.why.push('4G')
                }
            }

            if (wishes.amoled === true) {
                if (
                    item.displaytype === 'amoled' ||
                    item.displaytype === 'superamoled'
                ) {
                    item.confidence += 4
                    item.why.push('Amoled дисплей')
                }
            }

            if (wishes.big === true) {
                if (item.displaysize >= 5.5) {
                    item.confidence += 5
                    item.why.push('Великий екран')
                }
            }

            if (wishes.small === true) {
                if (item.displaysize <= 4.5) {
                    item.confidence += 5
                    item.why.push('Маленький екран')
                }
            }

            if (wishes.ppi === true) {
                if (item.displayresolution / item.displaysize > 200) {
                    item.confidence += 5
                }
            }

            if (wishes.replacementbattery === true) {
                if (item.hullmonolith !== true) {
                    item.confidence += 3
                    item.why.push('Знімна батарея')
                }
            }

            if (wishes.bigbattery === true) {
                if (item.batterymah > 3333) {
                    item.confidence += 5
                    item.why.push('Хороша автономність')
                }
            }

            if (wishes.water === true) {
                if (item.hullwaterproof === true) {
                    item.confidence += 4
                    item.why.push('Водонепроникний корпус')
                }
            }

            if (wishes.pull === true) {
                if (item.hullproof === true) {
                    item.confidence += 3
                    item.why.push('Ударостійкий корпус')
                }
            }

            if (wishes.premium === true) {
                if (item.hull === 'metal' || item.hull === 'ceramics') {
                    item.confidence += 4
                }
            }
        } else {
            if (wishes.smartphone === true && item.smartphone === true) {
                item.confidence += 10
                item.why.push('Смартфон')
            }

            if (wishes.vendor !== 'else') {
                if (wishes.vendor === item.vendor) {
                    item.confidence += 10
                }
            }

            if (+wishes.year === item.year || item.year > +wishes.year - 2) {
                item.confidence += 5
                item.why.push('Новинка')
            }

            if (
                +wishes.price >= item.price ||
                item.price - +wishes.price < 1000
            ) {
                item.confidence += 20
            }

            if (wishes.os === item.os) {
                item.confidence += 20
                item.why.push(item.os)
            }

            if (wishes.displaysize === item.displaysize) {
                item.confidence += 5
            } else if (Math.abs(wishes.displaysize - item.displaysize) <= 0.5) {
                item.confidence += 2
                item.why.push('Дисплей ' + item.displaysize + ' дюйм')
            }

            if (wishes.displayresolution === item.displayresolution) {
                item.confidence += 3
                item.why.push(
                    'Ширина дисплею ' + item.displayresolution + ' пікселів'
                )
            }

            if (wishes.displaytype === item.displaytype) {
                item.confidence += 3
            }

            if (
                wishes.displayprotect === true &&
                item.displayprotect === true
            ) {
                item.confidence += 3
                item.why.push('Захисне покриття дисплею')
            }

            if (wishes.display25d === true && item.display25d === true) {
                item.confidence += 3
                item.why.push('2.5D скло')
            }

            if (+wishes.cpufrequency <= item.cpufrequency) {
                item.confidence += 5
                item.why.push(
                    'Частота процесора: ' + item.cpufrequency + ' Ghz'
                )
            }

            if (+wishes.cpucore <= item.cpucore) {
                item.confidence += 3
            }

            if (wishes.cpuvendor === item.cpuvendor) {
                item.confidence += 3
            }

            if (+wishes.ram <= item.ram) {
                item.confidence += 6
                item.why.push('RAM: ' + item.ram + 'GB')
            }

            if (+wishes.rom <= item.rom) {
                item.confidence += 6
                item.why.push('Память: ' + item.rom + ' GB')
            }

            if (+wishes.batterymah <= item.batterymah) {
                item.confidence += 5
                item.why.push('Акумулятор: ' + item.batterymah + 'mAh')
            }

            if (wishes.batterytype === item.batterytype) {
                item.confidence += 3
            }

            if (
                wishes.batteryfastcharge === true &&
                item.batteryfastcharge === true
            ) {
                item.confidence += 3
                item.why.push('Швидка зарядка')
            }

            if (
                wishes.batterywireless === true &&
                item.batterywireless === true
            ) {
                item.confidence += 3
                item.why.push('Безпровідна зарядка')
            }

            if (+wishes.camerafrontmp <= item.camerafrontmp) {
                item.confidence += 3
                item.why.push('Селфі камера: ' + item.camerafrontmp + ' мп')
            }

            if (+wishes.camerarearmp <= item.camerarearmp) {
                item.confidence += 3
                item.why.push('Камера: ' + item.camerarearmp + ' мп')
            }

            if (
                wishes.camerarearflash === true &&
                item.camerarearflash === true
            ) {
                item.confidence += 3
            }

            if (
                wishes.camerarearautofocus === true &&
                item.camerarearautofocus === true
            ) {
                item.confidence += 3
            }

            if (
                wishes.camerarearstab === true &&
                item.camerarearstab === true
            ) {
                item.confidence += 3
                item.why.push('Стабілізація картинки при зйомці відео')
            }

            if (wishes.camerarear4k === true && item.camerarear4k === true) {
                item.confidence += 3
                item.why.push('Запис 4К відео')
            }

            if (
                wishes.camerareardual === true &&
                item.camerareardual === true
            ) {
                item.confidence += 3
            }

            if (wishes.wifi === true && item.wifi === true) {
                item.confidence += 3
                item.why.push('Wifi')
            }

            if (wishes.gprs === true && item.gprs === true) {
                item.confidence += 3
            }

            if (wishes.edge === true && item.edge === true) {
                item.confidence += 3
            }

            if (wishes.hsdpa === true && item.hsdpa === true) {
                item.confidence += 3
                item.why.push('3G')
            }

            if (wishes.lte === true && item.lte === true) {
                item.confidence += 3
                item.why.push('4G')
            }

            if (wishes.nfc === true && item.nfc === true) {
                item.confidence += 5
                item.why.push('NFC')
            }

            if (wishes.bluetooth === true && item.bluetooth === true) {
                item.confidence += 3
            }

            if (wishes.gps === true && item.gps === true) {
                item.confidence += 3
                item.why.push('Є геолокація')
            }

            if (wishes.irda === true && item.irda === true) {
                item.confidence += 3
            }

            if (wishes.sdcard === true && item.sdcard === true) {
                item.confidence += 5
                item.why.push('Є карта памяті')
            }

            if (wishes.dualsim === true && item.dualsim === true) {
                item.confidence += 5
                item.why.push('Є дві сім-карти')
            }

            if (wishes.fingerprint === true && item.fingerprint === true) {
                item.confidence += 5
                item.why.push('Є сканер відбитку пальця')
            }

            if (wishes.outusb === true && item.outusb === true) {
                item.confidence += 3
            }

            if (wishes.outusbc === true && item.outusbc === true) {
                item.confidence += 3
                item.why.push('USB C вхід')
            }

            if (wishes.outvendor === true && item.outvendor === true) {
                item.confidence += 3
            }

            if (wishes.jack === true && item.jack === true) {
                item.confidence += 4
                item.why.push('Є вихід для навушників')
            }

            if (wishes.fm === true && item.fm === true) {
                item.confidence += 3
            }

            if (wishes.flash === true && item.flash === true) {
                item.confidence += 3
            }

            if (wishes.hull === item.hull) {
                item.confidence += 4
            }

            if (wishes.hullmonolith === true && item.hullmonolith === true) {
                item.confidence += 3
            }

            if (
                wishes.hullwaterproof === true &&
                item.hullwaterproof === true
            ) {
                item.confidence += 3
                item.why.push('Водонепроникний корпус')
            }

            if (wishes.hullproof === true && item.hullproof === true) {
                item.confidence += 3
                item.why.push('Ударостійкий корпус')
            }
        }

        arr[i] = item
    })

    rated.sort(function(a, b) {
        if (a.confidence > b.confidence) {
            return -1
        }

        if (a.confidence < b.confidence) {
            return 1
        }

        return 0
    })

    return rated
}
