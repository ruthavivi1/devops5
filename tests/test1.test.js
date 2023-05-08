const request=require('supertest')
const app=require('../server')

describe('test suit 1:',()=>{
    test("test 1:",async()=>{
        const res =await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    })

    test("test 1:",async()=>{
        const res =await request(app).get('/1234')
        expect(res.statusCode).toEqual(404)
    })
})