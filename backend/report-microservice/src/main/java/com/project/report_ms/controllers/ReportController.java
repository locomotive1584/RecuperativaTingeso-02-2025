package com.project.report_ms.controllers;

import com.project.report_ms.models.TransactionDTO;
import com.project.report_ms.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    ReportService reportService;

    @GetMapping("ping")
    public ResponseEntity<Boolean> ping() {
        return ResponseEntity.ok(reportService.ping());
    }

    @GetMapping("/After//Before//")
    public ResponseEntity<List<TransactionDTO>> getSortedList() {
        return ResponseEntity.ok(reportService.sortBetweenDates(null, null));
    }

    @GetMapping("/After/{from}/Before//")
    public ResponseEntity<List<TransactionDTO>> getSortedListAfter(@PathVariable LocalDate from) {
        return ResponseEntity.ok(reportService.sortBetweenDates(from, null));
    }

    @GetMapping("/After//Before/{to}/")
    public ResponseEntity<List<TransactionDTO>> getSortedListBefore(@PathVariable LocalDate to) {
        return ResponseEntity.ok(reportService.sortBetweenDates(null, to));
    }

    @GetMapping("/After/{from}/Before/{to}/")
    public ResponseEntity<List<TransactionDTO>> getSortedListBetween(@PathVariable LocalDate from, @PathVariable LocalDate to) {
        return ResponseEntity.ok(reportService.sortBetweenDates(from, to));
    }
}
