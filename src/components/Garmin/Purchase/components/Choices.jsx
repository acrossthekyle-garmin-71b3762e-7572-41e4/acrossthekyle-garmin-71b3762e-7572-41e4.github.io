import React from 'react';

export const Choices = ({
	choice,
	choices,
	onChangeQuantity,
	onChoose,
	quantity,
}) => {
  return (
    <>
      {choices?.map(({ cost, name, sale, uuid }, index) => {
        const chosen = choice === uuid;

        if (choice !== undefined && !chosen) {
          return null;
        }

        return (
          <React.Fragment key={uuid}>
            <div
              className={
                [
                  `list-group-item py-3 no-shadow rounded-1 ${index === choices.length - 1 ? '' : 'mb-2'}`,
                  chosen ? 'bg-primary' : '',
                  chosen ? 'selected' : ''
                ].join(' ')
              }
            >
              <div className="row">
                <div
                	className={
	                	[
	                		'col-7 col-md-8 text-start', chosen ? 'text-light' : ''
	                	].join(' ')
	                }
                >
                  {name}
                  <span className="d-block small">
                    {sale !== undefined ? (
                      <>
                        <span
                        	className={`text-decoration-line-through ${chosen ? 'text-light' : 'text-muted'}`}
                        >
                        	${String(cost)}
                        </span>
                        <span className="text-danger"> ${String(sale)}</span>
                      </>
                    ) : (
                      <span>${String(cost)}</span>
                    )}
                  </span>
                </div>
                <div className="col-5 col-md-4 d-flex align-items-center justify-content-end">
                  {chosen ? (
                    <div className="dropdown">
                      <button
                      	className="btn btn-light dropdown-toggle"
                      	type="button"
                      	data-bs-toggle="dropdown"
                      >
                        Quantity: {quantity}
                      </button>
                      <ul className="dropdown-menu dropdown-menu-light">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <li key={value}>
                            <button
                              className={`dropdown-item ${value === quantity ? 'active' : ''}`}
                              onClick={() => onChangeQuantity(value)}
                            >
                              {String(value)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onChoose(uuid)}
                    >
                      Buy Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
