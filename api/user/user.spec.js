// test code
const request = require('supertest');
const should = require('should');
const app = require('../../index');


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


describe('POST /users 는', ()=> {
    describe('성공일 경우', ()=> {
        let name = 'Choi',
            age = 17,
            body;
        before(done=>{
            request(app)
                .post('/users')
                .send({name, age})
                .expect(201)
                .end((err, res)=> {
                    body = res.body;
                    done();
                });
        })
        it('생성된 사용자 객체를 반환한다.', ()=> {
            body.should.have.property('id');
        });
        it('입력한 name과 age를 반환한다.', ()=> {
            body.should.have.property('name', name);
            body.should.have.property('age', age);
        });
    })
    describe('실패일 경우', ()=> {
        let name = 'Choi',
            age = 17
        it('name 파라미터 누락 시 400을 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({age})
                .expect(400)
                .end(done);
        })
        it('age 파라미터 누락 시 400을 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({name})
                .expect(400)
                .end(done);
        })
        it('name, age 파라미터 누락 시 400을 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        it('name 중복일 경우 409를 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({'name': 'Jang', age})
                .expect(409)
                .end(done);
        })
    })
})


describe('GET /users/:id 는', ()=> {
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


describe('DELETE /users/:id 는', ()=> {
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


describe('PUT /users/:id 는', ()=> {
    describe('성공일 경우', ()=> {
        it('변경된 name과 age를 응답한다', (done)=> {
            const name = 'Bang';
            const age = 29;
            request(app)
                .put('/users/3')
                .send({name, age})
                .end((err, res)=> {
                    res.body.should.have.property('name', name);
                    res.body.should.have.property('age', age);
                    done();
                })
        })
    })
    describe('실패일 경우', ()=> {
        it('정수가 아닌 경우 400을 응답한다', (done)=> {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400을 응답한다.', (done)=> {
            request(app)
                .put('/users/3')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 사용자인 경우 404를 응답한다.', (done)=> {
            request(app)
                .put('/users/999')
                .send({name: 'Yoon', age: 10})
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409를 응답한다.', (done)=> {
            request(app)
                .put('/users/3')
                .send({name: 'Kim', age: 10})
                .expect(409)
                .end(done);
        });
    })
})