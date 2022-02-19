/*
 * @Author: vecpeng
 * @Date: 2022-02-19 21:18:23
 * @LastEditors: vecpeng
 * @LastEditTime: 2022-02-19 21:41:39
 * @FilePath: /tiny-vue3/effect.js
 * @Desc: 
 * 
 * Copyright (c) 2022 by vecpeng, All Rights Reserved. 
 */

const bucket = new Set()
let activeEffect

function effect(fn) {
    activeEffect = fn
    fn()
}

const data = { text: 'hello world' }

const obj = new Proxy(data, {
    get(target, key) {
        if (activeEffect) {
            bucket.add(activeEffect)
        }
        return target[key]
    },

    set(target, key, newVal) {
        target[key] = newVal
        bucket.forEach(fn => fn())
        return true
    }
})

effect(
    () => {
        document.body.innerText = obj.text
    }
)

setTimeout(() => {
    obj.text = "hello vue3"
}, 2000)