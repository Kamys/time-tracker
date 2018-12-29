import { connect } from 'react-redux'
import view from './view'
import { IRootState } from 'renderer/store/rootReducer';

interface IProps {

}

const mapStateToProps = (state: IRootState) => ({
    groups: state.entries.group,
})

const dispatchToProps = (dispatch) => ({

})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(view)
