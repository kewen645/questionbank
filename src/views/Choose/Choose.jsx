import React, { useState, useEffect } from 'react'
import GoBack from '@/components/GoBack/GoBack'
import { ChoosePageApi } from '@/request/api'
import { useNavigate, useParams } from 'react-router-dom'
import './Choose.less'

const Choose = () => {
	const navigate = useNavigate()

	//  all: 全部, err: 错误, done: 已做, notdone: 没做
	const [testType, setTestTyps] = useState('all')
	// 获取传过来的actionCode ， 用来发送请求
	const { code: actionCode } = useParams()

	// 题目完成情况
	const [qstatus, setQStatus] = useState([
		{ key: 'all', cn: '全部' },
		{ key: 'err', cn: '未做' },
		{ key: 'done', cn: '已做' },
		{ key: 'notdonw', cn: '错误' },
	])
	// 试题分类当前项
	const [qActive, setQActive] = useState('all')

	// 题目数量
	const [qNumArr, setQNumArr] = useState([5, 10, 15, 20, 25, 30])
	// 试题数量当前项
	const [numActive, setNumActive] = useState(0)

	const qdir = {
		all: '全部',
		one: '单选题',
		many: '多选题',
		check: '判断题',
		qa: '问答题',
		code: '编程题',
	}

	// 题目类型当前项
	const [qcateActive, setQCateActive] = useState('全部')
	const [qCategories, setQCategories] = useState([])

	useEffect(() => {
		async function fetchData() {
			// 发送请求：
			let res = await ChoosePageApi({
				actionCode,
				testType,
			})
			console.log(res.data)

			setQCategories(
				res.data.map((item) => {
					return { key: qdir[item.key], value: item.value, sort: item.sort }
				})
			)
		}
		fetchData()
	}, [])

	const goToExam = () => {
		// 进入考试模式,提示该功能暂未开放
	}

	return (
		<div className='choose'>
			<div className='top_btns'>
				<div className='top_btn1' onClick={() => navigate('/practice')}>
					进入练习模式
				</div>
				<div className='top_btn2' onClick={goToExam}>
					进入考试模式
				</div>
			</div>
			<div className='mytitle'>完成情况</div>
			<ul className='tabs'>
				{qstatus.map((item, index) => (
					<li key={index} className={qActive === item.key ? 'active' : ''} onClick={() => setQActive(item.key)}>
						{item.cn}
					</li>
				))}
			</ul>
			<div className='mytitle'>题目类型</div>
			<ul className='tabs'>
				{qCategories.map((item, index) => (
					<li key={index} className={item.key === qcateActive ? 'active' : ''} onClick={() => setQCateActive(item.key)}>
						{item.key}({item.value})
					</li>
				))}
			</ul>
			<div className='mytitle'>做题数量</div>
			<ul className='tabs'>
				{qNumArr.map((item, index) => (
					<li key={index} className={index === numActive ? 'active' : ''} onClick={() => setNumActive(index)}>
						{item}
					</li>
				))}
			</ul>
			<GoBack />
		</div>
	)
}

export default Choose
