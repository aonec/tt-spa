import React from 'react';
import * as antd from "antd";
//
// const DeviceBlock = (props) => {
//     return (
//         <div>
//             <MainDevice />
//             <ul>
//                 <li><SubDevice/></li>
//                 <li><SubDevice/></li>
//                 <li><SubDevice/></li>
//             </ul>
//         </div>
//     )
// }
//
// export default DeviceBlock;

const {  Checkbox  } = antd;

const CheckboxGroup = Checkbox.Group;

const plainOptions = [{id: 1, name: 'Прибор1'}, {id: 2, name: 'Прибор2'}, {id: 3, name: 'Прибор3'}];
const defaultCheckedList = [];

class DeviceBlock extends React.Component {
    state = {
        checkedList: defaultCheckedList,
        checkAll: false,
    };

    onChange = checkedList => {
        this.setState({
            checkedList,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    render() {
        return (
            <>
                <div className="site-checkbox-all-wrapper">
                    <Checkbox
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                    // options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                >
                    <Checkbox><h1>БЛОК1</h1><div>Картинка1</div></Checkbox>
                    <Checkbox><h1>БЛОК2</h1><div>Картинка2</div></Checkbox>
                    <Checkbox><h1>БЛОК3</h1><div>Картинка3</div></Checkbox>


                </CheckboxGroup>
            </>
        );
    }
}

export default DeviceBlock;