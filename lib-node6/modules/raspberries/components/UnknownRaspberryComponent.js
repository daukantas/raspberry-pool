'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpUser = require('react-alp-user');

var _reactAlpUser2 = _interopRequireDefault(_reactAlpUser);

var _SpinnerComponent = require('../../common/components/SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnknownRaspberryComponent extends _react.PureComponent {
  constructor() {
    var _temp;

    return _temp = super(...arguments), this.state = {}, _temp;
  }

  render() {
    var _props = this.props;
    const raspberry = _props.raspberry;
    const registerUnknown = _props.registerUnknown;
    const offlineRaspberries = _props.offlineRaspberries;


    return _react2.default.createElement(
      'div',
      { className: 'raspberry unknown' },
      _react2.default.createElement(_SpinnerComponent2.default, { active: raspberry.saving }),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          { className: 'text-title' },
          raspberry.hostname || raspberry.ip
        ),
        _react2.default.createElement(
          'span',
          { className: 'status label' },
          raspberry.ip
        ),
        _react2.default.createElement(
          'span',
          null,
          '\xA0'
        ),
        _react2.default.createElement(
          'span',
          { className: 'status label' },
          raspberry.online
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row row-responsive spaced' },
        _react2.default.createElement(
          'div',
          { className: 'col wp-50' },
          _react2.default.createElement(
            'div',
            { className: 'text-paragraph-title' },
            _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.title' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'input text' },
            _react2.default.createElement('input', {
              type: 'text',
              required: true,
              autoComplete: 'off',
              className: `${ this.state.name === undefined ? '' : `has-value${ this.state.name ? '' : ' has-empty-value' }` }`,
              value: this.state.name,
              onChange: e => this.setState({ name: e.target.value })
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `raspberry-url-${ raspberry.id }` },
              'Name'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col wp-50' },
          _react2.default.createElement(
            'div',
            { className: 'input radio' },
            _react2.default.createElement('input', {
              id: `add-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: '',
              checked: !this.state.addOrReplace,
              onChange: e => this.setState({ addOrReplace: e.target.value, id: null })
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `add-raspberry-${ raspberry.id }` },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.add' })
            )
          ),
          !offlineRaspberries.length ? '' : [_react2.default.createElement(
            'div',
            { key: 'addToExisting', className: 'input radio' },
            _react2.default.createElement('input', {
              id: `add-to-existing-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: 'addToExisting',
              checked: this.state.addOrReplace === 'addToExisting',
              onChange: e => this.setState({ addOrReplace: e.target.value, id: null })
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `add-to-existing-raspberry-${ raspberry.id }` },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.addToExisting' })
            )
          ), _react2.default.createElement(
            'div',
            { key: 'replace', className: 'input radio' },
            _react2.default.createElement('input', {
              id: `replace-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: 'replace',
              checked: this.state.addOrReplace === 'replace',
              onChange: e => this.setState({ addOrReplace: e.target.value })
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `replace-raspberry-${ raspberry.id }` },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.replace' })
            )
          )],
          _react2.default.createElement(
            _reactAlpUser2.default,
            null,
            user => _react2.default.createElement(
              'select',
              {
                disabled: !this.state.addOrReplace,
                name: 'raspberry',
                onChange: e => this.setState({ addOrReplace: this.state.addOrReplace || 'replace', id: e.target.value })
              },
              !this.state.id && _react2.default.createElement('option', { key: '__empty' }),
              offlineRaspberries.filter(r => r.data.owner === user.id).map(r => _react2.default.createElement(
                'option',
                { key: r.id, value: r.id },
                r.data.name
              ))
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'button-container align-center' },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            disabled: !!raspberry.saving || !this.state.addOrReplace && !this.state.name || this.state.addOrReplace && !this.state.id,
            onClick: () => {
              registerUnknown(raspberry, {
                name: this.state.name,
                addOrReplace: this.state.addOrReplace,
                id: this.state.id
              });
            }
          },
          _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.add' })
        )
      )
    );
    /*
            <button type="button" onClick={() => {
                sendAction(raspberry, 'blink');
                this.setState({ urlChanged: false });
            }}>Blink</button>
    */
  }
}
exports.default = UnknownRaspberryComponent;
UnknownRaspberryComponent.propTypes = {
  raspberry: _react.PropTypes.object.isRequired,
  offlineRaspberries: _react.PropTypes.array.isRequired,
  registerUnknown: _react.PropTypes.func.isRequired,
  sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=UnknownRaspberryComponent.js.map