import Alert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import './BasicAlert.less'

const BasicAlert = () => {
	const alertType = useSelector((state) => state.alert.alertType)
	const alertContent = useSelector((state) => state.alert.alertContent)
	const alertShown = useSelector((state) => state.alert.isShown)

	return (
		<Alert style={{ display: alertShown ? 'flex' : 'none' }} variant='filled' severity={alertType}>
			{alertContent}
		</Alert>
	)
}

export default BasicAlert
