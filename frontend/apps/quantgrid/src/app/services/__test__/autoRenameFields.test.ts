import { autoRenameFields } from '../autoRenameFields';

describe('autoRenameFields', () => {
  it('should rename duplicated field', () => {
    // Arrange
    const dsl = 'table t [f1]=2 [f2]=3 [f1]=4';

    // Act
    const result = autoRenameFields(dsl);

    // Assert
    expect(result).toBe('table t [f1]=2 [f2]=3 [f3]=4');
  });

  it('should rename multiple duplicated fields in one table', () => {
    // Arrange
    const dsl = 'table t [f1]=2 [f1]=3 [f1]=4';

    // Act
    const result = autoRenameFields(dsl);

    // Assert
    expect(result).toBe('table t [f1]=2 [f2]=3 [f3]=4');
  });

  it('should rename duplicated fields in all tables', () => {
    // Arrange
    const dsl = 'table t [f1]=2 [f2]=3 [f1]=4 table t1 [f1]=2 [f2]=3 [f1]=4';

    // Act
    const result = autoRenameFields(dsl);

    // Assert
    expect(result).toBe(
      'table t [f1]=2 [f2]=3 [f3]=4 table t1 [f1]=2 [f2]=3 [f3]=4'
    );
  });

  it('should return same dsl if no duplicated fields', () => {
    // Arrange
    const dsl = 'table t [f1]=2 [f2]=3 [f3]=4';

    // Act
    const result = autoRenameFields(dsl);

    // Assert
    expect(result).toBe(dsl);
  });

  it('should return same dsl if unable to parse dsl', () => {
    // Arrange
    const dsl = '!table t [f1]=2 [f2]=3 [f3]=4';

    // Act
    const result = autoRenameFields(dsl);

    // Assert
    expect(result).toBe(dsl);
  });
});
