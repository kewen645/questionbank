import React, { useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

export default function SimpleBackdrop(props) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(props.isLoading)
	const handleClose = () => {
		setOpen(false)
	}

	// 使用useEffect监控是否打开Loading
	useEffect(() => {
		setOpen(props.isLoading)
	}, [props.isLoading])

	return (
		<div>
			<Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</div>
	)
}
