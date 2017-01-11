type PropsType = {
  className: ?string,
  active: ?boolean,
};

export default ({ active, className }: PropsType) => (
  <div className={['spinner', active && 'active', className].filter(Boolean).join(' ')}>
    <div className="double-bounce1" />
    <div className="double-bounce2" />
  </div>
);
