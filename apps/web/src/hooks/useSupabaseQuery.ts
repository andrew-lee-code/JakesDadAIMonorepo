import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useSupabaseQuery<T = any>(
  tableName: string,
  options: {
    select?: string;
    filters?: Array<{ column: string; operator: string; value: any }>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}
) {
  const { select = "*", filters = [], orderBy, limit } = options;

  return useQuery({
    queryKey: ["supabase", tableName, select, filters, orderBy, limit],
    queryFn: async () => {
      let query = supabase.from(tableName as any).select(select);

      // Apply filters
      filters.forEach(({ column, operator, value }) => {
        switch (operator) {
          case "eq":
            query = query.eq(column, value);
            break;
          case "gt":
            query = query.gt(column, value);
            break;
          case "lt":
            query = query.lt(column, value);
            break;
          case "like":
            query = query.like(column, value);
            break;
          case "ilike":
            query = query.ilike(column, value);
            break;
        }
      });

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    },
  });
}
