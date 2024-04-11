import React, { FC, useEffect, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import bottleFirst from './assets/bottleFirst.jpg'
import bottleFourth from './assets/bottleFourth.jpg'
import bottleSecond from './assets/bottleSecond.png'
import bottleThird from './assets/bottleThird.jpg'
import './styles/hero.scss'
interface IHeroProps {
	border: string
	margin: string
	padding: string
}

const Hero: FC<IHeroProps> = ({ border, margin, padding }) => {
	const [backPosition, setBackPosition] = useState<string>(`0% 0%`)
	const [backSize, setBackSize] = useState<string>('100%')
	const [currImg, setCurrImg] = useState<number>(0)
	const [showModal, setShowModal] = useState<boolean>(false)

	const ArrayOfImages: string[] = [
		bottleFirst,
		bottleSecond,
		bottleThird,
		bottleFourth,
	]
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

		const x: number = ((e.clientX - left) / width) * 100
		const y: number = ((e.clientY - top) / height) * 100

		setBackPosition(`${x}% ${y}%`)
		setBackSize('200%')
	}
	const handleMouseLeave = () => {
		setBackPosition('center')
		setBackSize('cover')
	}

	const handleMouseClick = () => {
		setShowModal(!showModal)
	}
	const handleClickOutside = () => {
		setShowModal(false)
	}
	const handleMouseOver = (e: number) => {
		setCurrImg(e)
	}

	useEffect(() => {
		if (showModal) {
			setTimeout(() => {
				window.addEventListener('click', handleClickOutside)
			}, 300)
		}

		return () => {
			window.removeEventListener('click', handleClickOutside)
		}
	}, [showModal])

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div
						style={{
							display: 'flex',
						}}
					>
						<div
							className='mainImage'
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}
							onClick={handleMouseClick}
							style={{
								width: '400px',
								height: '300px',
								backgroundImage: `url(${ArrayOfImages[currImg]})`,
								backgroundSize: backSize,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: backPosition,
								border,
								margin,
								padding,
								position: 'relative',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: ' 10px 0px',
									position: 'absolute',
									bottom: '130px',
									left: '-90px',
								}}
							>
								{ArrayOfImages.map((_, id: number) => (
									<div
										onMouseOver={() => {
											handleMouseOver(id)
										}}
										style={{
											width: '20px',
											height: '10px',
											backgroundColor: 'white',
											borderRadius: '5px',
											scale: currImg === id ? '1.5' : '1',
										}}
									></div>
								))}
							</div>
						</div>

						<div className='column-images'>
							{ArrayOfImages.map((el: string, id: number) => (
								// ! бул жерде оң жактагы  сурөттөр бар
								<div>
									<img
										onMouseOver={() => {
											handleMouseOver(id)
										}}
										src={el}
										alt=''
										style={{
											width: '70px',
											height: '70px',
											border: currImg === id ? '1px solid red' : 'none',
										}}
									/>
								</div>
							))}
						</div>
					</div>
					{showModal ? (
						// ! бул жерде модальный терезе бар
						<div
							className='modalWindDivContainer'
							style={{
								position: 'absolute',
								zIndex: '10',
								top: '200px',
								left: '30%',
								backgroundColor: 'rgba(255, 255, 255, 0.5)',
							}}
						>
							<div
								style={{
									position: 'relative',
								}}
							>
								<img
									style={{
										width: '800px',
									}}
									src={ArrayOfImages[currImg]}
									alt=''
								/>

								<button
									className='modalCloseBtn'
									onClick={handleMouseClick}
									style={{
										position: 'absolute',
										top: '20px',
										right: '20px',
										color: 'red',
										background: 'none',
										border: 'none',
										fontSize: '30px',
									}}
								>
									<IoCloseCircleOutline />
								</button>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</>
	)
}

export default Hero
