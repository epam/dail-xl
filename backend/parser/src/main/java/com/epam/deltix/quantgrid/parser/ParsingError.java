package com.epam.deltix.quantgrid.parser;

import com.google.gson.annotations.Expose;
import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class ParsingError {
    @Expose
    int line;
    @Expose
    int position;
    @Expose
    String message;

    String tableName;
    String fieldName;

    public ParsingError(int line, int position, String message, String tableName, String fieldName) {
        this.line = line;
        this.position = position;
        this.message = message;
        this.tableName = tableName;
        this.fieldName = fieldName;
    }

    public ParsingError(int line, int position, String message) {
        this(line, position, message, null, null);
    }
}
