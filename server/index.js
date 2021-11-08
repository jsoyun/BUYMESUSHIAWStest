const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const config = require('./config/key');
const { auth } = require('./middleware/auth');

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected..'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

function getErrors(error) {
    let errorArray = [];
    if (error) {
        if (error.errors['email']) {
            errorArray.push(error.errors['email'].message);
        }
        if (error.errors['password']) {
            errorArray.push(error.errors['password'].message);
        }
        if (error.errors['name']) {
            errorArray.push(error.errors['name'].message);
        }
        if (error.errors['nickname']) {
            errorArray.push(error.errors['nickname'].message);
        }
        if (error.errors['address']) {
            errorArray.push(error.errors['address'].message);
        }
    } else {
        console.log('No Errors Product Saved Succefully');
    }
    return errorArray;
}

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요');
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    // 여기랑
    const user = new User(req.body);

    // User.findOne({ email: req.body.email }, (err, doc) => {
    //     console.log(doc);
    // });

    //////////////////////////////////////////////////////////////
    // user.save(async (err, userInfo) => {
    //     if (err) {
    //         let errors = getErrors(err);
    //         //Send Errors to browser
    //         console.log(errors);
    //         return res.json({ success: false });
    //     }

    //     await User.findOne({ email: req.body.email }, async (err, data) => {
    //         if (!data) {
    //             await User.findOne(
    //                 { nickname: req.body.nickname },
    //                 (err, data1) => {
    //                     if (!data1)
    //                         return res.status(200).json({ success: true });
    //                     else return res.json({ success: false });
    //                 }
    //             );
    //             // return res.json({
    //             //     success: false,
    //             //     alertMessage: '이메일 중복',
    //             // });
    //         } else {
    //             console.log('이메일 없으면');
    //             await User.findOne(
    //                 { nickname: req.body.nickname },
    //                 (err, data1) => {
    //                     if (!data1) {
    //                         console.log('닉네임 없으면');
    //                         return res.status(200).json({ success: true });
    //                     } else {
    //                         return res.json({
    //                             success: false,
    //                             alertMessage: '닉네임 중복',
    //                         });
    //                     }
    //                 }
    //             );
    //         }
    //     });
    // });

    ////////////////////////////////////////////////////////////////////////////////////

    // User.findOne({ email: req.body.email }, (err, userInfo2) => {
    //     if (!userInfo2) {
    //         console.log('이메일 없으면');
    //         User.findOne({ nickname: req.body.nickname }, (err, userInfo3) => {
    //             console.log('닉네임 없으면');
    //             if (!userInfo3) {
    //                 user.save((err, userInfo) => {
    //                     if (err) {
    //                         let errors = getErrors(err);
    //                         //Send Errors to browser
    //                         console.log(errors);

    //                         return res.json({ success: false });
    //                     }
    //                     return res.status(200).json({ success: true });
    //                 });
    //             } else {
    //                 console.log('닉네임 있으면');
    //                 return res.json({
    //                     success: false,
    //                     alertMessage: '닉네임 중복',
    //                 });
    //             }
    //         });
    //     } else {
    //         console.log('있으면');
    //         return res.json({
    //             success: false,
    //             alertMessage: '이메일 중복',
    //         });
    //     }
    // });

    //여기
    user.save(async (err, userInfo) => {
        if (err) {
            let errors = getErrors(err);
            //Send Errors to browser
            console.log(errors);

            return res.json({ success: false });
        }

        return res.status(200).json({ success: true });
    });
    // user.save((err, userInfo) => {
    //     if (err) return res.json({ success: false });
    //     return res.status(200).json({ success: true });
    // });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터 베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.',
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다',
                });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장한다. 어디에 ? 일단 쿠키에
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    // 비밀번호까지 맞다면 토큰을 생성하기.
});

app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        else
            return res.status(200).send({
                success: true,
            });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});
