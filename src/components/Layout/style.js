import styles from "styled-components"

export const Container = styles.div`
    //margin: 20px 118px;
`

export const HomeWrapper = styles.div`
`

export const Menu = styles.div`
    display: flex;
	margin-top: 140px;
`

export const TabBtn = styles.div`
    padding: 20px;
    font-size: 16px;
    margin-bottom: 20px;
    cursor: pointer;
    color: ${props => props.active ? 'red' : 'gray' }
`
