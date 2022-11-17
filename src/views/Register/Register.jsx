import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { RegisterApi } from '@/request/api'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, hideAlert } from '@/features/alert/alertSlice.js'
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

function Register() {
	const dispatch = useDispatch()
	const select = useSelector((state) => state.alert.isShown)

	const classes = useStyles()
	// 用户名
	const [phone, setPhone] = useState('')
	// 密码
	const [password, setPassword] = useState('')
	// 获取路由
	const navigate = useNavigate()

	// 管理注册信息
	const phoneHandler = (e) => {
		if (select) dispatch(hideAlert())
		setPhone(e.target.value)
	}

	const passwordHandler = (e) => {
		if (select) dispatch(hideAlert())
		setPassword(e.target.value)
	}

	// 点击了登录
	function submitFn() {
		RegisterApi({
			phone: Number(phone),
			password,
		})
			.then((res) => {
				if (res.errCode === 0) {
					// 存储手机号
					localStorage.setItem('phone', phone)
					dispatch(
						showAlert({
							alertType: 'success',
							alertContent: '注册成功',
						})
					)
					setTimeout(() => {
						// 1秒后跳转到登录页
						dispatch(hideAlert())
						navigate('/login')
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
			<h2 className={classes.title}>Register Page</h2>
			<form className={classes.root}>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='phone'
					placeholder='请输入手机号码'
					name='phone'
					autoComplete='phone'
					autoFocus
					value={phone}
					onChange={phoneHandler}
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
					立即注册
				</Button>
				<Link to='/login' variant='body2' style={{ color: '#02369d', marginTop: '20px' }}>
					返回登录
				</Link>
			</form>
		</div>
	)
}

export default Register
