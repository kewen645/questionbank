import { useState } from 'react'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import './Practice.less'

// 手指触摸点
let startX = -1

// 手指松开点
let endX = -1

// 当前li的索引值
let liIndex = 0

const Practice = () => {
	const [questionArr, setQuestionArr] = useState([1, 2, 3, 4])
	const [ulLeft, setulLeft] = useState(0)

	const handleTouchStart = (e) => {
		startX = e.touches[0].clientX
	}

	const handleTouchMove = (e) => {
		endX = e.touches[0].clientX
	}

	const handleTouchEnd = (e) => {
		// 获取滑动范围
		if (startX > -1 && endX > -1) {
			let distance = Math.abs(startX - endX)
			if (distance > 30) {
				// 零个手指位置距离相差30px，即视为有效滑动
				if (startX > endX) {
					liIndex--
					// index不能超过数组长度
					if (Math.abs(liIndex) >= questionArr.length - 1) {
						liIndex = 1 - questionArr.length
					}
				} else {
					liIndex++
					if (liIndex >= 0) {
						liIndex = 0
					}
				}

				setulLeft(100 * liIndex + '%')
				startX = -1
				endX = -1
			} else {
				return
			}
		}
	}

	return (
		<div className='Practice'>
			<div className='top'>
				<AmpStoriesIcon />
				<div className='top_index'>
					<b>9</b>
					<span>/</span>
					<span>10</span>
				</div>
			</div>
			<ul
				className='question'
				style={{ width: questionArr.length * 100 + '%', left: ulLeft }}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}>
				{questionArr.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	)
}

export default Practice
