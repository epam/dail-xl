package com.epam.deltix.quantgrid.engine.compiler;

import com.epam.deltix.quantgrid.engine.compiler.result.CompiledColumn;
import com.epam.deltix.quantgrid.engine.compiler.result.CompiledReferenceTable;
import com.epam.deltix.quantgrid.engine.compiler.result.CompiledResult;
import com.epam.deltix.quantgrid.engine.compiler.result.CompiledTable;
import com.epam.deltix.quantgrid.engine.node.expression.Constant;
import com.epam.deltix.quantgrid.engine.node.expression.RowNumber;
import com.epam.deltix.quantgrid.engine.node.plan.local.SelectLocal;
import com.epam.deltix.quantgrid.parser.ast.ConstNumber;
import com.epam.deltix.quantgrid.parser.ast.ConstText;
import com.epam.deltix.quantgrid.parser.ast.CurrentField;
import com.epam.deltix.quantgrid.parser.ast.FieldReference;
import com.epam.deltix.quantgrid.parser.ast.Formula;
import com.epam.deltix.quantgrid.parser.ast.Function;
import com.epam.deltix.quantgrid.parser.ast.QueryRow;
import com.epam.deltix.quantgrid.parser.ast.TableReference;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class CompileFormula {

    public static CompiledResult compile(CompileContext context, Formula formula) {
        if (formula instanceof TableReference reference) {
            return compileTableReference(context, reference);
        }

        if (formula instanceof FieldReference reference) {
            return compileFieldReference(context, reference);
        }

        if (formula instanceof CurrentField reference) {
            return compileCurrentField(context, reference);
        }

        if (formula instanceof QueryRow reference) {
            return compileQueryRowReference(context, reference);
        }

        if (formula instanceof ConstNumber constant) {
            return new CompiledColumn(new Constant(constant.number()), List.of());
        }

        if (formula instanceof ConstText constant) {
            return new CompiledColumn(new Constant(constant.text()), List.of());
        }

        if (formula instanceof Function function) {
            return CompileFunction.compile(context, function);
        }

        throw new RuntimeException();
    }

    private static CompiledTable compileTableReference(CompileContext context, TableReference reference) {
        String name = reference.table();
        CompiledTable table = context.table(name);
        SelectLocal select = new SelectLocal(new RowNumber(table.node()));
        return new CompiledReferenceTable(name, select);
    }

    private static CompiledResult compileFieldReference(CompileContext context, FieldReference reference) {
        CompiledTable table = context.compile(reference.table()).cast(CompiledTable.class);
        return table.field(context, reference.field());
    }

    private static CompiledResult compileCurrentField(CompileContext context, CurrentField reference) {
        CompiledTable table = context.table();
        String fieldName = reference.field();

        return (table == null)
                ? context.currentField(fieldName)
                : context.projectCurrentField(fieldName);
    }

    private static CompiledResult compileQueryRowReference(CompileContext context, QueryRow reference) {
        CompiledTable table = context.table();
        CompileUtil.verify(table != null, "Can't reference $ outside function");
        return context.nested() ? table : table.flat();
    }
}
