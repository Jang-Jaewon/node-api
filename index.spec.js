const request = require('supertest');
const should = require('should');
const app = require('./index');


describe('GET /users는', ()=> {
    describe('성공 일 경우', ()=>{
        it('사용자 객체를 배열로 응답한다.', (done)=> {
            request(app)
                .get('/users')
                .end((err, res)=> {
                    res.body.should.be.instanceOf(Array);
                    done();
            })
        })
        it('최대 limit 갯수만큼 응답한다.', (done)=> {
            request(app)
                .get('/users?limit=2')
                .end((err, res)=> {
                    res.body.should.have.lengthOf(2);
                    done();
            })
        })
    })
    describe('실패 일 경우', ()=>{
        it('limit이 숫자형이 아니면 40을 응답한다.', (done)=> {
            request(app)
                .get('/users?limit=three')
                .expect(400)
                .end(done);
        })
    })
})


describe('GET /users/1은', ()=> {
    describe('성공일 경우', ()=> {
        it('id가 1인 사용자 객체를 반환한다.', (done)=> {
            request(app)
                .get('/users/1')
                .end((err, res)=> {
                    res.body.should.be.instanceOf(Object);
                    res.body.should.have.property('id', 1);
                    res.body.should.have.property('name', 'Park');
                    res.body.should.have.property('age', 13);
                    done();
            })
        })
    })
    describe('실패일 경우', ()=> {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', (done)=> {
            request(app)
                .get('/users/three')
                .expect(400)
                .end(done)
        });
        it('id를 찾을 수 없는 경우 404로 응답한다.', (done)=> {
            request(app)
                .get('/users/9999')
                .expect(404)
                .end(done)
        });
    })
})


describe('GET /users/1은', ()=> {
    describe('성공일 경우', ()=> {
        it('204를 응답한다.', (done)=> {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })
    describe('실패일 경우', ()=> {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', (done)=> {
            request(app)
                .delete('/users/two')
                .expect(400)
                .end(done);
        })
    })
})