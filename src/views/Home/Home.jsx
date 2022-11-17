import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeDefaultApi } from '@/request/api.js'
import Loading from '@/components/Loading/'
import xiaolang from '@/assets/images/home/xiaolang.png'
import books from '@/assets/images/home/books.png'
import examination from '@/assets/images/home/examination.png'
import practice from '@/assets/images/home/practice.png'
import List from '@/components/Home/List.jsx'
import './Home.less'

const Home = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [exam, setExam] = useState({})
	// 学科题库列表
	const [exemItems, setExemItems] = useState([])
	// 收藏题目
	const [collect, setCollect] = useState('')
	// 错题集
	const [wrong, setWrong] = useState('')
	const [study, setStudy] = useState('')

	// 这个函数，每次根据token合法与否去后端拿数据都会用到，可以考虑写成hook
	const fetchData = async () => {
		// 判断有没有token
		let token = localStorage.getItem('x-auth-token')
		setLoading(false)

		// 有token，验证是否失效
		if (token) {
			let res = await HomeDefaultApi()
			// 如token失效，跳转至/login
			if (res.response && res.response.data.errCode === 1002) {
				navigate('/login')
			} else {
				// 有效token, 做数据的渲染
				let { exam, exemItems, collect, wrong, study } = res.data
				setExam(exam)
				setExemItems(exemItems)
				setCollect(collect)
				setWrong(wrong)
				setStudy(study)
			}
		} else {
			// 无token跳转/login
			navigate('/login')
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='home'>
			<div className='title'>
				<div className='subject'>{exam.title}</div>
				<div className='testSubject'>切换考试科目</div>
			</div>
			<div className='studyKu'>
				<p className='welcome'>欢迎使用IT猿题库!</p>
				<div className='down'>
					<img src={xiaolang} alt='' />
					<div className='right'>
						<div className='top'>
							<span>已学{study}题</span>
							<span>|</span>
							<span>共{exam.itemCount}题</span>
						</div>
						<div className='down'>
							<div className='err'>
								<div>{wrong}</div>
								<div>错题</div>
							</div>
							<div className='shoucang'>
								<div>{collect}</div>
								<div>收藏</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='category'>
				<img src={examination} alt='' />
				<img src={books} alt='' />
				<img src={practice} alt='' />
			</div>
			<div className='tiku'>
				<h3 className='subject_title'>学科题库</h3>
				<span>坚持每一天，成长看得见</span>
			</div>
			<List listArr={exemItems} />
			<Loading isLoading={loading} />
		</div>
	)
}

export default Home
