import axios from '../../../axios'

interface ModalInterface {
    visible: boolean
}






export async function getCalculator(id = '') {
    try {
        const res = await axios.get(`Calculators/${id}`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'device',
            message: 'Произошла ошибка запроса Вычислителя',
        }
    }
}

export async function putCalculator(deviceId = '', form = {}) {
    try {
        const res = await axios.put(`Calculators/${deviceId}`, form)
        // console.log("putCalculator", form)
        alert('Вычислитель успешно изменен!')
        return res
    } catch (error) {
        const handleError = error.response.data.error
        console.log(handleError)
        if (handleError.Code === 'entityAlreadyExists') {
            const {Message} = handleError
            if (Message === null) {
                const id = null
                console.log(handleError.Message)
                return {show: true, id: id}
            }
            const id = parseInt(Message.replace(/[^\d]/g, ''))
            console.log(handleError.Message)
            return {show: true, id: id}
            // alert(`В системе уже есть устройство с совпадающими настройками соединения ${id}`)
        }
    }
}

//   <StyledModal width="800" visible={visible}>
//     <StyledModalBody>
//         <Header>
//             В системе уже есть устройство с совпадающими настройками
//             соединения
//         </Header>
//         <p>
//             Пожалуйста, измените настройки соединения для данного
//             устройства
//         </p>
//     </StyledModalBody>
//     <StyledFooter>
//         <ButtonTT color={'white'}>Отмена</ButtonTT>
//         <ButtonTT color={'red'} big>
//             Изменить настройки соединения
//         </ButtonTT>
//     </StyledFooter>
// </StyledModal>

