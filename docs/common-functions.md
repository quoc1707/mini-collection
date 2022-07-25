---
sidebar_position: 1
---

# Common functions

## Day of the year

```typescript
const daysIntoYear = (date: Date): number => {
    return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
            Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
    )
}
```

## Deep comparison of objects

```typescript
interface Object {
    isEqual(other: Object): boolean
}

Object.prototype.isEqual = function (other) {
    for (let p in this) {
        if (typeof this[p] !== typeof other[p]) return false

        if ((this[p] === null) !== (other[p] === null)) return false

        switch (typeof this[p]) {
            case 'undefined':
                if (typeof other[p] !== 'undefined') return false
                break
            case 'object':
                if (
                    this[p] !== null &&
                    other[p] !== null &&
                    (this[p].constructor.toString() !==
                        other[p].constructor.toString() ||
                        !this[p].isEqual(other[p]))
                )
                    return false
                break
            case 'function':
                if (
                    p !== 'isEqual' &&
                    this[p].toString() !== other[p].toString()
                )
                    return false
                break
            default:
                if (this[p] !== other[p]) return false
        }
    }
    return true
}
```

## File download (Deno)

```typescript
import { ensureDir } from 'https://deno.land/std@0.145.0/fs/mod.ts'

const download = (url: string, dirname: string) => {
    fetch(url)
        .then((value) => {
            new Response(
                new ReadableStream({
                    async start(controller) {
                        const reader = value.clone().body!.getReader()
                        while (true) {
                            const { done } = await reader.read()
                            if (done) break
                        }
                        controller.close()
                    },
                })
            )
            return value.arrayBuffer()
        })
        .then((value) => {
            const subpath = new URL(url).pathname.split('/').filter(Boolean)
            const filename = subpath[subpath.length - 1]
            const fullPath = `${dirname}/${filename}`

            ensureDir(dirname).then(() => {
                Deno.writeFile(fullPath, new Uint8Array(value))
            })
        })
        .catch(console.error)
}
```

## File download (Node)

```typescript
import { createWriteStream, unlink } from 'fs'

import http from 'http'
import https from 'https'

const protocol = url.startsWith('http://') ? http : https

const download = (url: string, destination: string) => {
    return new Promise((resolve, reject) => {
        const file = createWriteStream(destination, { flags: 'w' })

        const request = protocol.get(url, (response) => {
            if (response.statusCode === 200) response.pipe(file)
            else {
                file.close()
                unlink(destination, () => {})
                reject(
                    `Server responded with ${response.statusCode}: ${response.statusMessage}.`
                )
            }
        })

        request.on('error', (error) => {
            file.close()
            unlink(destination, () => {})
            reject(error.message)
        })

        file.on('finish', () => resolve())

        file.on('error', (error) => {
            file.close()

            if (error.code === 'EEXIST') reject('File already exists.')
            else reject(error.message)
        })
    })
}
```

## Image download

```typescript
const parseUrlToImageData = async (url: string): Promise<string> => {
    return fetch(url)
        .then((response) => {
            return response.blob()
        })
        .then((blob) => {
            return URL.createObjectURL(blob)
        })
}

const downloadImage = async (url: string) => {
    const a = document.createElement('a')

    a.href = await parseUrlToImageData(url)
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
```

## Filename RegExp

```typescript
const standardizeFilename = (str: string): string => {
    let text = str
        .replace(/[^\x00-\x7F]/gm, '')
        .replace(/(\\|\/|\:|\*|\?|\"|\<|\>|\||\,|\-)/gm, ' ')
        .replace(/\s{1,}/g, '_')
    return text
}
```

## JSON formatting

```typescript
import { writeFile } from 'fs'

const writeFormattedData = (
    data: any,
    path: string,
    indentation: number | string
) => {
    writeFile(path, JSON.stringify(data, null, indentation), (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
}
```

## Vietnamese accent removal

```typescript
const convertVietnameseToNonAccent = (str: string): string => {
    let text = str
        .replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A')
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/I|Í|Ì|Ĩ|Ị/g, 'I')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/Đ/g, 'D')
        .replace(/đ/g, 'd')
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
        .replace(/\u02C6|\u0306|\u031B/g, '')
    return text
}
```
