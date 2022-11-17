import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import fast from '@/assets/images/tabbar/fast.png'
import home1 from '@/assets/images/tabbar/home_1.png'
import home2 from '@/assets/images/tabbar/home_2.png'
import my1 from '@/assets/images/tabbar/my_1.png'
import my2 from '@/assets/images/tabbar/my_2.png'
import './index.less'

const useStyles = makeStyles({
	root: {
		width: 500,
	},
})

const navArr = ['/home', '/fast', '/user']

export default function SimpleBottomNavigation() {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	// 控制tabbar出现与否
	const [isShown, setShown] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	// 当组件加载完毕后，就能拿到当前页面的路径
	// 如果是/login页面，就不显示tabbar
	useEffect(() => {
		if (navArr.includes(location.pathname)) {
			setShown(true)
		} else {
			setShown(false)
		}
	}, [setShown, location.pathname])

	return (
		<BottomNavigation
			style={{ display: isShown ? 'flex' : 'none' }}
			value={value}
			onChange={(event, newValue) => {
				navigate(navArr[newValue])
				setValue(newValue)
			}}
			showLabels
			className={classes.root}>
			<BottomNavigationAction label='首页' icon={<img src={value === 0 ? home1 : home2} alt='home' />} />
			<BottomNavigationAction label='快速刷题' icon={<img src={fast} alt='fast' />} />
			<BottomNavigationAction label='我的' icon={<img src={value === 2 ? my1 : my2} alt='my1' />} />
		</BottomNavigation>
	)
}
