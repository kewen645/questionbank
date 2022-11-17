import { useNavigate } from 'react-router-dom'
import './GoBack.less'

const GoBack = () => {
	const navigate = useNavigate()

	const gobackFn = () => {
		navigate(-1)
	}

	return (
		<div className='go-back' onClick={gobackFn}>
			返回上一页
		</div>
	)
}

export default GoBack
