import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { LoginApi } from '@/request/api'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, hideAlert } from '@/features/alert/alertSlice'
import BasicAlert from '@/features/alert/BasicAlert'
import logo from '@/assets/images/logo.png'
const useStyles = makeStyles((theme) => ({
	loginPage: {
		background: '#fff',
		height: '100vh',
		overflow: 'hidden',
	},
	logo: {
		display: 'block',
		margin: '0 auto',
		marginTop: '20vh',
	},
	title: {
		fontSize: '.5rem',
		textAlign: 'right',
		width: '90%',
		margin: '0 auto 20px',
		color: '#02369d',
	},
	btn: {
		color: '#fff',
		fontWeight: 'normal',
		background: '#02369d',
	},
	copyright: {
		width: '90%',
		margin: '20px auto',
		paddingLeft: '8px',
		boxSizing: 'border-box',
	},
	root: {
		width: '90%',
		margin: 'auto',
		'& > *': {
			width: '100%',
			display: 'block',
			fontSize: '.5rem',
		},
		'& .MuiTextField-root': {
			fontSize: '.5rem',
			'& .MuiInputBase-input': {
				fontSize: '.5rem',
			},
		},
	},
}))

function Login() {
	const dispatch = useDispatch()
	const select = useSelector((state) => state.alert.isShown)

	const classes = useStyles()
	// 用户名
	const [username, setUsername] = useState(localStorage.getItem('phone') || '')
	// 密码
	const [password, setPassword] = useState('wolfcode123')
	// 获取路由
	const navigate = useNavigate()

	// 管理登录信息
	const usernameHandler = (e) => {
		setUsername(e.target.value)
		if (select) dispatch(hideAlert())
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value)
		if (select) dispatch(hideAlert())
	}

	// 点击了登录
	function submitFn() {
		LoginApi({
			username,
			password,
		})
			.then((res) => {
				if (res.errCode === 0) {
					dispatch(
						showAlert({
							alertType: 'success',
							alertContent: '登录成功',
						})
					)
					// 存入token
					let token = res.data
					localStorage.setItem('x-auth-token', token)
					// 1秒后跳转到首页
					setTimeout(() => {
						dispatch(hideAlert())
						navigate('/home')
					}, 1000)
				} else {
					dispatch(
						showAlert({
							alertType: 'error',
							alertContent: res.message,
						})
					)
				}
			})
			.catch((err) => {
				dispatch(
					showAlert({
						alertType: 'error',
						alertContent: err.response.data.message,
					})
				)
			})
	}

	return (
		<div className={classes.loginPage}>
			<BasicAlert />
			<img src={logo} className={classes.logo} alt='' />
			<h2 className={classes.title}>Login Page</h2>
			<form className={classes.root}>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='username'
					placeholder='请输入手机号码'
					name='username'
					autoComplete='username'
					autoFocus
					value={username}
					onChange={usernameHandler}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='password'
					placeholder='请输入密码'
					type='password'
					id='password'
					autoComplete='password'
					value={password}
					onChange={passwordHandler}
				/>
				<Button className={classes.btn} type='button' fullWidth variant='contained' onClick={submitFn}>
					直接登录
				</Button>
				<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
					<Link to='/register' variant='body2' style={{ color: '#02369d' }}>
						前往注册
					</Link>
					<Link to='/home' variant='body2' style={{ color: '#999999' }}>
						返回首页
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Login
